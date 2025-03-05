import Sequelize, { Model,DataTypes } from "sequelize";
import Sections from "./Section";

class Content extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
      },
        sectionId: {
          type: DataTypes.UUID,
          // references: {
          //     model: Sections,
          //     key: 'id'
          // },
          // onDelete: 'CASCADE'
      },
        type: {
          type: DataTypes.ENUM('video', 'text', 'quiz'),
          allowNull: false,
      },
        contentLink: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
        duration: {
          type: DataTypes.INTEGER,
          allowNull: true,
          comment: 'Duration in minutes for video content'
      },
        order: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 1,
          comment: 'Order of the content in the section'
      }
      },
      {
        sequelize,
        timestamps: true,
        tableName: "Contents"
      }
    );

    return this;
  }

  static getDummyPostRequestBody() {
    return {
      sectionId: "sample-section-id",
      type: "video",
      contentLink: "http://example.com/sample-video",
      duration: 10,
      order: 1
    };
  }

  static associate(models) {
        this.belongsTo(models.Section, { foreignKey: 'sectionId' });
  }
  
}

export default Content;
