'use strict';
module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('Images', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      type: {
        allowNull: false,
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      BikeshedId: {
        allowNull: true,
        type: DataTypes.INTEGER
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function (migration, DataTypes, done) {
    migration.dropTable('Images').done(done);
  }
};
