export interface Hero {
  registration_image?: HeroOption
  header_image?: HeroOption
  about_image?: HeroOption
  text_left?: HeroOption
  text_right?: HeroOption
  button_1?: HeroOption
  button_2?: HeroOption
  button_3?: HeroOption
}

interface HeroOption {
  value?: string,
  image_url?: string,
  redirect_to?: string,
  description?: string,
}
