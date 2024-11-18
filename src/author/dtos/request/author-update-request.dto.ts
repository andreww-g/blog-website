import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const updateAuthorSchema = z.object({
  contactInfo: z
    .object({
      telegram: z.string().optional().nullable(),
      facebook: z.string().optional().nullable(),
      instagram: z.string().optional().nullable(),
    })
    .optional(),
  description: z.string().nullable(),
});

export class AuthorCreateRequestDto extends createZodDto(updateAuthorSchema) {}
