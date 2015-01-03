'use strict';
module.exports = {
  up: function (migration, DataTypes, done) {
    migration.createTable('Bikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: ''
      },
      body: {
        allowNull: false,
        type: DataTypes.TEXT,
        defaultValue: '',
      },
      imageLink: {
        allowNull: true,
        type: DataTypes.STRING
      },
      imageType: {
        allowNull: true,
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
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE
      },
      BikeshedId: {
        allowNull: true,
        type: DataTypes.INTEGER
      }
    }).done(done);
  },
  down: function (migration, DataTypes, done) {
    migration.dropTable('Bikes').done(done);
  }
};
