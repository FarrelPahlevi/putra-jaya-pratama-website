type ServiceIllustration = {
  file: string
  alt: string
}

// Custom PJP artwork. Files share an 800x640 canvas and a 400x320 variant.
export const SERVICE_ILLUSTRATIONS: Record<string, ServiceIllustration> = {
  'asphalt-hotmix': {
    file: 'asphalt-hotmix',
    alt: 'Ilustrasi isometrik asphalt paver oranye menghamparkan aspal hotmix',
  },
  'paving-block': {
    file: 'paving-block',
    alt: 'Ilustrasi isometrik susunan paving beton abu-abu dengan palu karet oranye',
  },
  'cut-and-fill': {
    file: 'cut-and-fill',
    alt: 'Ilustrasi isometrik ekskavator oranye membentuk elevasi tanah',
  },
  'cor-beton': {
    file: 'cor-beton',
    alt: 'Ilustrasi isometrik truk pengaduk beton oranye dan putih',
  },
  'saluran-u-ditch': {
    file: 'saluran-u-ditch',
    alt: 'Ilustrasi isometrik saluran beton U-ditch terbuka dengan pelat penutup',
  },
  'resapan-air': {
    file: 'resapan-air',
    alt: 'Ilustrasi isometrik potongan sumur resapan dengan pipa masuk dan lapisan kerikil',
  },
}
