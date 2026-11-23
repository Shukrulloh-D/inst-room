// ВСЕ картинки сайта описаны здесь. Файлы лежат в public/images.
// Хотите переименовать или заменить картинку: меняйте только этот файл.
//
//   public/images/
//   ├─ logo.svg
//   ├─ common/       общие: 404, баннеры в боковой колонке
//   ├─ home/         главная: баннеры вверху и блок «О нас»
//   ├─ pages/        страницы «О компании»
//   ├─ news/         новости: 1-4 для карточек + картинки внутри статьи
//   ├─ products/     фото товаров: 1.png ... 12.png
//   ├─ categories/   плитки каталога: 1.png ... 12.png
//   └─ brands/       логотипы брендов: 1.png ... 8.png

const IMAGES_DIR = "/images";

// сколько файлов лежит в папках с нумерацией
export const PRODUCT_IMAGES = 12;
export const CATEGORY_IMAGES = 12;
export const BRAND_IMAGES = 8;
export const NEWS_IMAGES = 4;

export const IMAGES = {
  logo: IMAGES_DIR + "/logo.svg",

  common: {
    notFound: IMAGES_DIR + "/common/404.png",
    banner1: IMAGES_DIR + "/common/banner-1.png",
    banner2: IMAGES_DIR + "/common/banner-2.png",
  },

  home: {
    hero1: IMAGES_DIR + "/home/hero-1.png",
    hero2: IMAGES_DIR + "/home/hero-2.png",
    hero3: IMAGES_DIR + "/home/hero-3.png",
    hero4: IMAGES_DIR + "/home/hero-4.png",
    about: IMAGES_DIR + "/home/about.png",
  },

  pages: {
    aboutWide: IMAGES_DIR + "/pages/about-wide.png",
    aboutSide: IMAGES_DIR + "/pages/about-side.png",
  },

  newsDetail: {
    cover: IMAGES_DIR + "/news/cover.png",
    photo: IMAGES_DIR + "/news/photo.png",
    bottom: IMAGES_DIR + "/news/bottom.png",
  },
};

// n — любой номер, картинка выбирается по кругу
export function productImage(n: number): string {
  return IMAGES_DIR + "/products/" + ((n % PRODUCT_IMAGES) + 1) + ".png";
}

export function categoryImage(n: number): string {
  return IMAGES_DIR + "/categories/" + ((n % CATEGORY_IMAGES) + 1) + ".png";
}

export function brandImage(n: number): string {
  return IMAGES_DIR + "/brands/" + ((n % BRAND_IMAGES) + 1) + ".png";
}

export function newsImage(n: number): string {
  return IMAGES_DIR + "/news/" + ((n % NEWS_IMAGES) + 1) + ".png";
}
