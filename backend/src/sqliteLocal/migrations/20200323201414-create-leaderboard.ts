import { QueryInterface, DataTypes } from 'sequelize';
module.exports = {
  up: function(queryInterface: QueryInterface, Sequelize) {
    return () => queryInterface.createTable('leaderboard', {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      tempoTotal: {
        type: DataTypes.DECIMAL(22,2),
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  }, 
    
  down: function(queryInterface: QueryInterface, Sequelize) {
    // If migration fails, this will be called. Rollback your migration changes.
    return () => queryInterface.dropTable('leaderboard');
  },
};
