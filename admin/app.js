const AdminJS = require('adminjs')
const AdminJSExpress = require('@adminjs/express')
const express = require('express')
const AdminJSSequelize = require('@adminjs/sequelize')

const db = require('./models/index')
AdminJS.registerAdapter({
    Resource: AdminJSSequelize.Resource,
    Database: AdminJSSequelize.Database,
  })
  
const PORT = 8000

const start = async () => {
  const app = express()
  const NovelsResourceOptions = {
    listProperties: ['title', 'slug', 'scraped'],
    filterProperties: ['title', 'slug', 'scraped', 'popularity', 'rating'],
    properties: {
      description: {
        type: 'richtext',
        custom: {
          modules: {
            toolbar: [['bold', 'italic'], ['link', 'image']],
          },
        },
      }
    },
    // actions: {
    //   new: {
    //     isAccessible: false
    //   },
    // },
  }
  const NovelChaptersResourceOptions = {
    properties: {
      content: {
        type: 'richtext',
        custom: {
          modules: {
            toolbar: [['bold', 'italic'], ['link', 'image']],
          },
        },
      }
    },
  }
  const adminOptions = {
    // We pass Category to `resources`
    resources: [{ resource:  db.Novels, options: NovelsResourceOptions },{ resource:  db.NovelChapters, options: NovelChaptersResourceOptions }],
  }
  const admin = new AdminJS(adminOptions)

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()