const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
// const { isCallTrace } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe", function () {
          let fundMe
          let deployer
          const sendValue = ethers.utils.parseEther("0.777")
          beforeEach(async () => {
              // if (!developmentChains.includes(network.name)) {
              //   throw "You need to be on a development chain to run tests"
              //
              accounts = await ethers.getSigners()
              deployer = accounts[0]
              await deployments.fixture(["fundMe"])
              fundMe = await ethers.getContract("FundMe", deployer)
              //   mockV3Aggregator = await ethers.getContract(
              //       "MockV3Aggregator",
              //       deployer
              //   )
          })
          isCallTrace("allows peopel to fun and withdraw", async function () {
              await fundMe.fund({ value: sendValue })
              await fundMe.withdraw()
              const endingBalance = await fundMe.provider.getBalance(
                  fundMe.address
              )
              assert.equial(endingBalance.toString(), "0")
          })
      })
