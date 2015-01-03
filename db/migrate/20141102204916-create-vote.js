'use strict';
module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      value: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      BikeshedId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      BikeId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      UserId: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    }).done(done);
  },
  down: function (migration, DataTypes, done) {
    migration.dropTable('Votes').done(done);
  }
};
