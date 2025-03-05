import Sequelize, { Model, DataTypes } from "sequelize";

class Course extends Model {
  static init(sequelize) {
    super.init(
      {
        id:{
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        title:{
          type:Sequelize.STRING,
          allowNull:false
        },
        author:{
          type:Sequelize.STRING,
          allowNull:false
        },
        description:{
          type:Sequelize.STRING,
          allowNull:false
        },
        curricullum:{
          type:Sequelize.ENUM('0-Levels','AS-Levels','A2-Levels','IGCSE'),
          allowNull:false
        },
        subject:{
          type:Sequelize.ENUM('Mathematics','Physics','Chemistry','Biology','Computer Science'),
          allowNull:false
        },
        status:{
          type:Sequelize.ENUM('Active','Inactive'),
          allowNull:false
        },
        price:{
          type:Sequelize.FLOAT,
          allowNull:false
        },
        acceptCoupon:{
          type:Sequelize.BOOLEAN,
          allowNull:false
        },
        published: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false
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
    this.belongsTo(models.User);
    this.hasMany(models.Section, { foreignKey: 'courseId' });
    this.hasMany(models.Coupon, { foreignKey: 'courseId' });
    this.hasMany(models.PurchaseHistory, { foreignKey: 'courseId' });
  }
  
}

export default Course;
