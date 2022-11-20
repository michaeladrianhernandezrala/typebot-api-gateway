class accountController {
  static async postAccount(req, res) {
    res.json({ message: 'Hola mundo' });
  }
}

module.exports = {
  postAccount: accountController.postAccount,
};
