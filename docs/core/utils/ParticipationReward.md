# ParticipationReward
***
## Functions:
- [`constructor()`](#constructor)
- [`isClaimable()`](#isclaimable)
- [`hasClaim()`](#hasclaim)
- [`getVaultStatus()`](#getvaultstatus)
- [`getUserVaults()`](#getuservaults)
- [`initializeVault()`](#initializevault)
- [`openVault()`](#openvault)
- [`addShares()`](#addshares)
- [`claimReward()`](#claimreward)
- [`claimRewards()`](#claimrewards)
- [`setRewardsBudget()`](#setrewardsbudget)
- [`addControllerContract()`](#addcontrollercontract)
- [`toggleRewards()`](#togglerewards)
- [`contributeReward()`](#contributereward)
## Events:
- [`RewardBudgetChanged`](#rewardbudgetchanged)
- [`VaultInitialized`](#vaultinitialized)
- [`VaultOpened`](#vaultopened)
- [`VaultClosed`](#vaultclosed)
- [`RewardClaimed`](#rewardclaimed)
- [`RewardsClaimed`](#rewardsclaimed)
- [`SharesAdded`](#sharesadded)
- [`RewardBalanceIncreased`](#rewardbalanceincreased)
- [`ControllerContractAdded`](#controllercontractadded)
- [`RewardsToggled`](#rewardstoggled)
## Modifiers:
- [`vaultExists()`](#vaultexists)
- [`onlyControllerContract()`](#onlycontrollercontract)
## Graphs:
- [Dependency Graph](#dependency-graph)
- [Inheritance Graph](#inheritance-graph)
***
## Function Definitions:
###  constructor()
```
constructor(contract IContractRegistry _contractRegistry) public 
```
###  isClaimable()
```
isClaimable(bytes32 _vaultId, address _beneficiary) public  returns (bool)
```
###  hasClaim()
```
hasClaim(bytes32 _vaultId, address _beneficiary) public  returns (bool)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_vaultId`| bytes32| Bytes32|
| `_beneficiary`| address| address of the beneficiary|

###  getVaultStatus()
```
getVaultStatus(bytes32 _vaultId) external  returns (enum ParticipationReward.VaultStatus)
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_vaultId`| bytes32| Bytes32|

###  getUserVaults()
```
getUserVaults(address _account) external  returns (bytes32[])
```

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_account`| address| address|

###  initializeVault()
```
initializeVault(bytes32 _contractName, bytes32 _vaultId, uint256 _endTime) external  returns (bool, bytes32)
```
There must be enough funds in this contract to support opening another vault

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_contractName`| bytes32| Name of contract that uses ParticipationRewards in bytes32|
| `_vaultId`| bytes32| Bytes32|
| `_endTime`| uint256| Unix timestamp in seconds after which a vault can be closed|

###  openVault()
```
openVault(bytes32 _contractName, bytes32 _vaultId) external 
```
Vault must be in an initialized state

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_contractName`| bytes32| the controller contract|
| `_vaultId`| bytes32| Vault ID in bytes32|

###  addShares()
```
addShares(bytes32 _contractName, bytes32 _vaultId, address _account, uint256 _shares) external 
```
This will be called by contracts after an account has voted in order to add them to the vault of the specified election.

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_contractName`| bytes32| the controller contract|
| `_vaultId`| bytes32| Bytes32|
| `_account`| address| address|
| `_shares`| uint256| uint256|

###  claimReward()
```
claimReward(uint256 _index) external 
```
Uses the vaultId at the specified index of userVaults.
This function is used when a user only wants to claim a specific vault or if they decide the gas cost of claimRewards are to high for now.
(lower cost but also lower reward)

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_index`| uint256| uint256|

###  claimRewards()
```
claimRewards(uint256[] _indices) external 
```
Uses the vaultIds at the specified indices of userVaults.
This function is used when a user only wants to claim multiple vaults at once (probably most of the time)
The array of indices is limited to 19 as we want to prevent gas overflow of looping through too many vaults

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_indices`| uint256[]| uint256[]|

###  setRewardsBudget()
```
setRewardsBudget(bytes32 _contractName, uint256 _amount) external 
```
When opening a vault this contract must have enough POP to fund the rewardBudgets of the new vault
Every controller contract has their own rewardsBudget to set indivual rewards per controller contract

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_contractName`| bytes32| the name of the controller contract in bytes32|
| `_amount`| uint256| uint256 reward amount in POP per vault|

###  addControllerContract()
```
addControllerContract(bytes32 _contractName, address _contract) external 
```
all critical functions to init/open vaults and add shares to them can only be called by controller contracts

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_contractName`| bytes32| the name of the controller contract in bytes32|
| `_contract`| address| the address of the controller contract|

###  toggleRewards()
```
toggleRewards(bytes32 _contractName) external 
```
all critical functions to init/open vaults and add shares to them can only be called by controller contracts

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_contractName`| bytes32| the address of the controller contract|

###  contributeReward()
```
contributeReward(uint256 _amount) external 
```
Sufficient RewardsBalance will be checked when opening a new vault to see if enough POP exist to support the new Vault

| Parameter Name | Type | Description |
|------------|-----| -------|
| `_amount`| uint256| uint256 amount in POP to be used for vault rewards|

## Events
### RewardBudgetChanged
```
RewardBudgetChanged(bytes32 _contractName, uint256 amount)
```
### VaultInitialized
```
VaultInitialized(bytes32 vaultId)
```
### VaultOpened
```
VaultOpened(bytes32 vaultId)
```
### VaultClosed
```
VaultClosed(bytes32 vaultId)
```
### RewardClaimed
```
RewardClaimed(bytes32 vaultId, address _account, uint256 amount)
```
### RewardsClaimed
```
RewardsClaimed(address _account, uint256 amount)
```
### SharesAdded
```
SharesAdded(bytes32 _vaultId, address _account, uint256 _shares)
```
### RewardBalanceIncreased
```
RewardBalanceIncreased(address account, uint256 amount)
```
### ControllerContractAdded
```
ControllerContractAdded(bytes32 _contractName, address _contract)
```
### RewardsToggled
```
RewardsToggled(bytes32 _contractName, bool prevState, bool newState)
```
## Modifiers
### `vaultExists()`
```
vaultExists(bytes32 _vaultId)
```
## Parameters:
- `_vaultId`: Bytes32
### `onlyControllerContract()`
```
onlyControllerContract(bytes32 _contractName)
```
## Parameters:
- `_contractName`: Bytes32
## Graphs
### Dependency Graph
![Dependency Graph](/docs/images/ParticipationReward_dependency_graph.png)
### Inheritance Graph
![Inheritance Graph](/docs/images/ParticipationReward_inheritance_graph.png)
