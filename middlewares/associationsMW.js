const associations = require('../associations')

const verifyAssociation = (req, res, next) => {
  const associationExists = associations.find(asso => {
    return asso.slug === req.params.slug
  })

  if(associationExists){
    req.association = associationExists
    next()
  }else{
    res.status(404).json('Not found')
  }
}


module.exports = {verifyAssociation}