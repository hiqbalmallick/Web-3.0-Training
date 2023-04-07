const { expect } = require("chai");
const { CarData } = require("../__mocks__/Cars");

/**
 * Test cases for CarRegistration Contract
 */
describe("Testing Contract CarRegistration", function () {
  /**
   * Declaring variable for later use
   */
  let smartContract, carOwner1, carOwner2;

  /**
   * Deploying contract before each test execution
   */
  beforeEach(async () => {
    [carOwner1, carOwner2] = await ethers.getSigners();
    const CarRegistration = await ethers.getContractFactory("CarRegistration");
    smartContract = await CarRegistration.deploy();
  });

  /**
   * Test case for adding car details
   */
  it("should successfully add car details for given registration number and return correct details", async function () {
    /**
     * To make sure contract is deployed
     */
    await smartContract.deployed();

    /**
     * Set car details
     */
    await smartContract.setCarDetails(
      CarData.registrationNumber,
      CarData.brandName,
      CarData.modelName,
      CarData.launchYear,
      carOwner1.address
    );

    const carInfo = await smartContract.getCarDetails(
      CarData.registrationNumber
    );

    /**
     * Validate if the details retrieved for
     * the provided registration number are correct
     */
    expect(carInfo.brandName).to.be.equal(CarData.brandName);
    expect(carInfo.modelName).to.be.equal(CarData.modelName);
    expect(carInfo.launchYear).to.be.equal(CarData.launchYear);
    expect(carInfo.owner).to.be.equal(carOwner1.address);
  });

  /**
   * Test case for car owner retrieval
   */
  it("should return correct car owner", async function () {
    /**
     * To make sure contract is deployed
     */
    await smartContract.deployed();

    /**
     * Set car details
     */
    await smartContract.setCarDetails(
      CarData.registrationNumber,
      CarData.brandName,
      CarData.modelName,
      CarData.launchYear,
      carOwner1.address
    );

    const carOwner = await smartContract.getCarOwner(
      CarData.registrationNumber
    );

    /**
     * Validate if the owner retrieved for
     * the provided registration number is correct
     */
    expect(carOwner).to.be.equal(carOwner1.address);
  });

  /**
   * Test cases to validate method changeCarOwnership
   */
  describe("Testing method changeCarOwnership", () => {
    /**
     * Test case for transferring car ownership successfully
     */
    it("should successfully transfer ownership of a car to another account", async function () {
      /**
       * To make sure contract is deployed
       */
      await smartContract.deployed();

      /**
       * Set car details
       */
      await smartContract.setCarDetails(
        CarData.registrationNumber,
        CarData.brandName,
        CarData.modelName,
        CarData.launchYear,
        carOwner1.address
      );

      /**
       * To validate if the event has emitted with the correct args
       */
      await expect(
        smartContract.changeCarOwnership(
          CarData.registrationNumber,
          carOwner2.address
        )
      )
        .to.emit(smartContract, "OwnershipChanged")
        .withArgs(carOwner1.address, carOwner2.address);

      const carOwner = await smartContract.getCarOwner(
        CarData.registrationNumber
      );

      /**
       * Validate if the ownership has been transferred
       * to the expected address
       */
      expect(carOwner).to.be.equal(carOwner2.address);
    });

    /**
     * Test case for failed attempt to transferring car owner
     */
    it("should not transfer ownership of a car to another account due to incorrect owner details", async function () {
      /**
       * To make sure contract is deployed
       */
      await smartContract.deployed();

      /**
       * Set car details
       */
      await smartContract.setCarDetails(
        CarData.registrationNumber,
        CarData.brandName,
        CarData.modelName,
        CarData.launchYear,
        carOwner2.address
      );

      /**
       * Validate if the ownership transfer has been
       * reverted due to invalid ownership of the car
       */
      await expect(
        smartContract.changeCarOwnership(
          CarData.registrationNumber,
          carOwner1.address
        )
      ).to.be.revertedWith("Invalid Owner");
    });
  });
});
