import { SubmitProblemRequestDto as ISubmitProblemDto } from '@banbok/shared';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitProblemRequestDto implements ISubmitProblemDto {
  @ApiProperty({
    example: "A+B",
    description: '문제 이름',
  })
  readonly title: string;

  @ApiProperty({
    example: 'BOJ',
    description: '문제 사이트 이름',
  })
  readonly site: string;

  @ApiProperty({
    example: 'https://www.acmicpc.net/problem/1000',
    description: '문제 링크',
  })
  readonly link: string;
}
