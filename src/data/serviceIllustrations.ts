type ServiceIllustration = {
  file: string
  alt: string
}

// Custom PJP artwork. Files share an 800x640 canvas and a 400x320 variant.
export const SERVICE_ILLUSTRATIONS: Record<string, ServiceIllustration> = {
  'asphalt-hotmix': {
    file: 'asphalt-hotmix',
    alt: 'Ilustrasi alat penghampar aspal hotmix berwarna oranye.',
  },
  'paving-block': {
    file: 'paving-block',
    alt: 'Ilustrasi paving block abu-abu dengan palu karet oranye.',
  },
  'cut-and-fill': {
    file: 'cut-and-fill',
    alt: 'Ilustrasi ekskavator oranye untuk pekerjaan cut and fill.',
  },
  'cor-beton': {
    file: 'cor-beton',
    alt: 'Ilustrasi truk pengaduk beton berwarna oranye dan putih.',
  },
  'saluran-u-ditch': {
    file: 'saluran-u-ditch',
    alt: 'Ilustrasi saluran beton U-Ditch dan pelat penutupnya.',
  },
  'resapan-air': {
    file: 'resapan-air',
    alt: 'Ilustrasi bagian dalam sumur resapan dengan pipa dan lapisan kerikil.',
  },
}
