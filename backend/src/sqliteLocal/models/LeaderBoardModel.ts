import { Column, Model, Table, UpdatedAt, ForeignKey, Index, CreatedAt} from 'sequelize-typescript';
@Table({
  tableName: "leaderBoard",
  timestamps: true,
})
export default class LeaderBoardModel extends Model<LeaderBoardModel> {

  @Column
  nome: string;

  @Column
  tempoTotal: number

  @CreatedAt
  createdAt: Date;
  
  @UpdatedAt
  updatedAt: Date;

}