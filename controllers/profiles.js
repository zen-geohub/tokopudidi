const { Profile, User } = require('../models')

class UserProfile {
  static async readProfile(req, res) {
    try {
      const UserId = req.session['UserId']
      const data = await Profile.findOne({ where: { UserId } })

      res.render('user/profile/profile', { data })
    } catch (error) {
      res.send(error)
    }
  }

  static async showCreateProfile(req, res) {
    try {
      const { path, msg } = req.query;

      res.render('user/profile/registerProfile', { path, msg })
    } catch (error) {
      res.send(error)
    }
  }

  static async createProfile(req, res) {
    try {
      const UserId = req.session['UserId'];

      if (req.file) {
        req.body['imageUrl'] = `/public/${req.file['filename']}`
      }
      req.body['UserId'] = +UserId

      await Profile.create(req.body)
      res.redirect('/user/products')
    } catch (error) {
      if (err['name'] === 'SequelizeValidationError' || err['name'] === 'SequelizeUniqueConstraintError') {
        const msg = err['errors'].map(el => el['message']);
        const path = err['errors'].map(el => el['path']);

        res.redirect(`/register?msg=${msg}&path=${path}`)
      } else {
        res.send(err)
      }
    }
  }
}

module.exports = UserProfile;