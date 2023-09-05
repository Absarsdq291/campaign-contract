const { assert } = require("chai");
const { expect } = require("chai");
const { hre, ethers } = require("hardhat");

describe("Campaign", function () {
  it("contract should be deployed", async function () {
    const [owner] = await ethers.getSigners();// manager addrerss
    const hardhatToken = await ethers.deployContract("CampaignFactory" );

    await hardhatToken.connect(owner).createCampaign(0);
    // expect(await hardhatToken.manager()).to.equal(owner.address);
    const [arr]  = await hardhatToken.connect(owner).getDeployedCampaigns();

    try{
      expect(([arr]).to.equal(null));
      assert(false)
    }catch(err){
      assert(err)
    }
    

  })
  
  it("contributer should be added", async function (){
    const [owner] = await ethers.getSigners();// manager addrerss
    const hardhatToken = await ethers.deployContract("Campaign" , [0, owner.address]);

    await hardhatToken.connect(owner).contribute({value: 1})
    
    const x = await hardhatToken.approversCount();
    expect(x).to.equal(1)
  })

  it("manager should be the address that called the function", async function (){
    const [owner] = await ethers.getSigners();// manager addrerss
    const hardhatToken = await ethers.deployContract("Campaign" , [0, owner.address]);
    
    const mngr = await hardhatToken.manager()

    expect(mngr).to.equal(owner.address)
  })
})