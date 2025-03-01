import Sequelize, { Model,DataTypes } from "sequelize";
import Section from "./Section";

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
          //     model: Section,
          //     key: 'id'
          // },
          // onDelete: 'CASCADE'
      },
        type: {
          type: DataTypes.ENUM('video', 'text', 'quiz'),
          allowNull: false,
      },
        contentData: {
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
        tableName: "Content"
      }
    );

    return this;
  }
  static associate(models) {
        this.belongsTo(models.Section, { foreignKey: 'sectionId' });
  }
  
}

export default Content;
