// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract CarRegistration {
    mapping(string => Car) carRegistration;

    struct Car {
        string brandName;
        string modelName;
        uint256 launchYear;
        address owner;
    }

    function setCarDetails(
        string memory registrationNumber,
        string memory brandName,
        string memory modelName,
        uint256 launchYear,
        address owner
    ) public {
        carRegistration[registrationNumber] = Car(
            brandName,
            modelName,
            launchYear,
            owner
        );
    }

    function getCarDetails(
        string memory registrationNumber
    )
        public
        view
        returns (
            string memory brandName,
            string memory modelName,
            uint256 launchYear,
            address owner
        )
    {
        return (
            carRegistration[registrationNumber].brandName,
            carRegistration[registrationNumber].modelName,
            carRegistration[registrationNumber].launchYear,
            carRegistration[registrationNumber].owner
        );
    }

    event OwnershipChanged(address indexed seller, address indexed buyer);

    modifier validateOwner(string memory registrationNumber) {
        require(getCarOwner(registrationNumber) == msg.sender, "Invalid Owner");
        _;
    }

    function getCarOwner(
        string memory registrationNumber
    ) public view returns (address owner) {
        return (carRegistration[registrationNumber].owner);
    }

    function changeCarOwnership(
        string memory registrationNumber,
        address buyer
    ) public validateOwner(registrationNumber) {
        Car memory car = carRegistration[registrationNumber];
        address seller = car.owner;
        car.owner = buyer;
        carRegistration[registrationNumber] = car;
        emit OwnershipChanged(seller, buyer);
    }
}
