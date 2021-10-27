# Region
***
## Functions:
- [`constructor()`](#constructor)
- [`getAllRegions()`](#getallregions)
- [`getAllVaults()`](#getallvaults)
- [`addRegion()`](#addregion)
## Events:
- [`RegionAdded`](#regionadded)
## Graphs:
- [Dependency Graph](#dependency-graph)
- [Inheritance Graph](#inheritance-graph)
***
## Function Definitions:
###  constructor()
```
constructor(address _beneficiaryVault, contract IContractRegistry _contractRegistry) public 
```
###  getAllRegions()
```
getAllRegions() public  returns (bytes32[])
```
###  getAllVaults()
```
getAllVaults() public  returns (address[])
```
###  addRegion()
```
addRegion(bytes32 region_, address _beneficiaryVault) external 
```
## Events
### RegionAdded
```
RegionAdded(bytes32 region)
```
## Graphs
### Dependency Graph
![Dependency Graph](/docs/images/Region_dependency_graph.png)
### Inheritance Graph
![Inheritance Graph](/docs/images/Region_inheritance_graph.png)
