import web3 from "./web3";

// const address = "0x10CcB3456FCD3D906cd5A5c5A77223655B05Dc72";
const address = " ";//Address where your contract has deployed

 const abi = //Your contract abi here
export default new web3.eth.Contract(abi, address);
