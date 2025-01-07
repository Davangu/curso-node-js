const z = require('zod')

const movieSchema = z.object({
  title: z.string({ invalid_type_error: 'El título debe ser un string' }).min(1),
  genre: z.array(z.enum(['Action', 'Drama', 'Fantasy', 'Comedy', 'Crime', 'Terror'])).min(1),
  year: z.number().int().min(1888).max(2077),
  director: z.string().min(1),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).optional(),
  poster: z.string().url()
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = { validateMovie, validatePartialMovie }
