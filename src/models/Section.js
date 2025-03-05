import Sequelize, { Model, DataTypes } from "sequelize";
import Course from "./Course"; // Add this line

class Section extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
      courseId: {
          type: DataTypes.UUID,
          references: {
              model: Course,
              key: 'id'
          },
          onDelete: 'CASCADE'
      },
      title: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      order: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          comment: 'Order of the section in the course'
      }
      },
      {
        sequelize,
        timestamps: true,
        tableName: 'Sections'
      }
    );

    return this;
  }

  static getDummyPostRequestBody() {
    return {
      courseId: "sample-course-id",
      title: "Sample Section Title",
      order: 1
    };
  }

  static associate(models) {
    this.belongsTo(models.Course, { foreignKey: 'courseId' });
    this.hasMany(models.Content, { foreignKey: 'sectionId' });
    // this.belongsTo(models.User, { foreignKey: "userId" });
    // this.belongsTo(models.Address, { foreignKey: "addressId" });
  }
}

export default Section;
