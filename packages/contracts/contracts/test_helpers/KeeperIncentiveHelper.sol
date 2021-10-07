pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";

import "../KeeperIncentive.sol";

contract KeeperIncentiveHelper is KeeperIncentive {
  using SafeMath for uint256;

  event FunctionCalled(address account);

  constructor(ERC20 pop_) public KeeperIncentive(msg.sender, pop_) {}

  function defaultIncentivisedFunction() public keeperIncentive(0) {
    emit FunctionCalled(msg.sender);
  }

  function incentivisedFunction() public keeperIncentive(1) {
    emit FunctionCalled(msg.sender);
  }
}
