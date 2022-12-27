
const hre = require("hardhat");
const ethers = hre.ethers;
const upgrades = hre.upgrades;
const chai = require("chai");
const fs = require("fs");
const path = require("path");
const { solidity } = require("ethereum-waffle");
const { expect } = chai;
const { BigNumber, logger, Contract } = require("ethers");
const network = hre.hardhatArguments.network;

chai.use(solidity);

const overrides = {
    gasLimit: 9999999
}

describe("Loyalswap", function () {
    let accounts = [];
    let deployedBalances;

    beforeEach(async () => {
        accounts = await hre.ethers.getSigners();
        minter = accounts[0];
        receiver = accounts[1];

        /**deploy the  loyalswapERC20 Smart contract*/

        const balances = await ethers.getContractFactory("Balances");
        deployedBalances= await balances.deploy();
        await deployedBalances.connect(minter).deployed()
    });

    describe("Minter function", function () {

        it("It should run Minter function", async () => { 
            await deployedBalances.connect(minter).mint(minter.address, ethers.utils.parseUnits("1000", 18))
        })
    });

    describe("Send function", function () {

        it("It should run Send function", async () => { 
            await deployedBalances.connect(minter).mint(minter.address, ethers.utils.parseUnits("1000", 18))
            await deployedBalances.connect(minter).send(receiver.address, ethers.utils.parseUnits("50", 18))
        })
    });

    describe("getBalance function", function () {

        it("It should run getBalance function", async () => { 
            await deployedBalances.connect(minter).mint(minter.address, ethers.utils.parseUnits("1000", 18))
            await deployedBalances.connect(minter).send(receiver.address, ethers.utils.parseUnits("50", 18))
            console.log("Balance of the Minter",await deployedBalances.getBalances(minter.address))
            console.log("Balance of the Receiver",await deployedBalances.getBalances(receiver.address))

        })
    });
});