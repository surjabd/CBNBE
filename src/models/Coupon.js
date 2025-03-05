import Sequelize, { Model, DataTypes } from "sequelize";

class Coupon extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        code: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        discount: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        courseId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Courses',
            key: 'id',
          },
        },
        used: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        sequelize,
        timestamps: true,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Course, { foreignKey: 'courseId' });
  }
}

export default Coupon;
