import { ApiProperty } from '@nestjs/swagger';

export type Type = 'ANALOG' | 'DISCRETE' | 'DIGITAL' | 'STRING';

export class Tag {
  @ApiProperty({ example: 'React5_temp001' })
  Name: string;

  @ApiProperty({
    example: 'Reactor 5 - Cooling water temperature',
  })
  Description: string;

  @ApiProperty({ example: 'C' })
  Units: string;

  @ApiProperty({ example: 'ANALOG' })
  Type: Type;

  constructor(Name: string, Description: string, Units: string, Type: string) {
    this.Name = Name;
    this.Description = Description || '';
    this.Units = Units || '';
    this.Type = Type as Type;
  }
}
