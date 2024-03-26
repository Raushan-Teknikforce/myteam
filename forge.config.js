module.exports = {
  // ...
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        certificateFile: './cert.pfx',
        certificatePassword: process.env.CERTIFICATE_PASSWORD
      }
    }
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'Raushan-Teknikforce',
          name: 'myteam'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
  // ...
}