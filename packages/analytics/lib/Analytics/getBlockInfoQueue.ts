import fastq, { queueAsPromised } from "fastq";
import { config } from "./../../config";
import { providers } from "./providers";
import { CircuitBreaker } from "./CircuitBreaker";
import { retryHandler } from "./retryHandler";
import { transactionReceiptQueue } from "./getTransactionReceiptsQueue";

let processedBlocks = 0;
let seenTransactions = 0;

const queueConfig = {
  maximumBackoff: 64 * 1000, // 64 seconds
  minimumBackoff: 1 * 1000, // 1 second
  concurrentRequests: 2,
  circuitBreakerMaxTries: 5,
};

let circuitBreaker = undefined;

interface Args {
  blockNumber: number;
  tries?: number;
}
const getBlock = async ({ blockNumber, tries }: Args): Promise<void> => {
  return new Promise(async (resolve, reject) => {
    const shouldCancelRequest = retryHandler(
      { tries, reject, options: queueConfig },
      () => {
        getBlock({ blockNumber, tries });
      }
    );

    const block = await providers[
      Math.floor(Math.random() * providers.length)
    ].getBlockWithTransactions(blockNumber);

    if (shouldCancelRequest()) {
      return;
    }

    block.transactions.map((transaction) => {
      transactionReceiptQueue.push({ transaction, block });
    });

    seenTransactions += block.transactions.length;

    processedBlocks++;
    resolve();
  });
};

const getCircuitBreaker = (): CircuitBreaker => {
  if (!circuitBreaker) {
    circuitBreaker = new CircuitBreaker({
      queue: blockInfoQueue,
      config: queueConfig,
    });
  }
  return circuitBreaker;
};

const withCircuitBreaker = (callback) => {
  return (args: Args): Promise<void> => {
    return new Promise(async (resolve, reject) => {
      const breaker = getCircuitBreaker();
      if (!breaker.checkCircuit(args.tries)) {
        blockInfoQueue.push(args);
        resolve(undefined);
        return;
      }
      await callback().catch((e) => reject(e));
      breaker.closeCircuit();
      resolve(undefined);
    });
  };
};
export { processedBlocks, seenTransactions };

export const blockInfoQueue: queueAsPromised<Args> = fastq.promise(
  withCircuitBreaker(getBlock),
  config.concurrentBlockRequests
);
