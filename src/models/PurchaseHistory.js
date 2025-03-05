import Sequelize, { Model, DataTypes } from "sequelize";

class PurchaseHistory extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
        },
        courseId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: 'Courses',
            key: 'id',
          },
        },
        paymentType: {
          type: Sequelize.ENUM('Bkash', 'Coupon'),
          allowNull: false,
        },
        couponId: {
          type: DataTypes.UUID,
          allowNull: true,
          references: {
            model: 'Coupons',
            key: 'id',
          },
        },
        bkashTransactionId: {
          type: Sequelize.STRING,
          allowNull: true,
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
    this.belongsTo(models.User, { foreignKey: 'userId' });
    this.belongsTo(models.Course, { foreignKey: 'courseId' });
    this.belongsTo(models.Coupon, { foreignKey: 'couponId' });
  }
}

export default PurchaseHistory;
