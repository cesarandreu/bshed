const createError = require('http-errors')

module.exports = function (sequelize, DataTypes) {
  const Vote = sequelize.define('Vote', {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    BikeshedId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    hooks: {
      async beforeCreate (vote, opts) {
        // Confirm vote count is zero
        await confirmVoteCount(vote, opts, 0)
      },

      async afterCreate (vote, opts) {
        // Confirm vote count is one
        await confirmVoteCount(vote, opts, 1)
      }
    },
    classMethods: {
      associate (models) {
        Vote.belongsTo(models.Bikeshed)
        Vote.belongsTo(models.User)
        Vote.hasMany(models.Rating)
      }
    }
  })

  return Vote

  /**
   * Confirm Vote.count matches expected value
   * @param {Instance} vote Model instance
   * @param {Object} opts Model options
   * @param {Number} value Expected count
   * @returns {Promise}
   */
  async function confirmVoteCount (vote, opts, value) {
    const voteCount = await Vote.count({
      transaction: opts.transaction,
      where: {
        BikeshedId: vote.BikeshedId,
        UserId: vote.UserId
      }
    })
    if (voteCount !== value)
      throw createError(409, 'Can only vote once per Bikeshed', {expose: true})
  }
}
