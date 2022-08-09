const validate = (req, res, next) => {
  const stock = Number(req.body.stock)
  if(isNaN(stock)) {
    res.json({
      Message: 'Input stock must be a number'
    })
  }
}

module.exports = validate