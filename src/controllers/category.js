const categoryModel = require('../models/category')
const categoryController = {
  sort: async (req, res) => {
    try{
      const page = Number(req.query.page) || 1
      const limit = Number(req.query.limit) || 5
      const offset = (page - 1) * limit
      const sortby = req.query.sortby || 'name'
      const sort = req.query.sort.toUpperCase() || 'ASC'
      const search = req.query.search || ''
      const result = await categoryModel.sort({limit, offset, sort, sortby, search})
      const {rows: [count]} = await categoryModel.countCategory()
      const totalData = parseInt(count.count)
      const totalPage = Math.ceil(totalData/limit)
      
      res.status(200).json({
        pagination:{
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage
        },
        data: result.rows
      })
    }catch(error){
      console.log(error);
    }
  },
  getAllCategory: (req, res) => {
    categoryModel.selectAll()
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  getCategory: (req, res) => {
    const id = Number(req.params.id)
    categoryModel.select(id)
      .then(
        result => res.json(result.rows)
      )
      .catch(err => res.send(err)
      )
  },
  insert: (req, res) => {
    const { name } = req.body
    categoryModel.insert(name)
      .then(
        result => res.json('Category created')
      )
      .catch(err => res.send(err)
      )
  },
  update: (req, res) => {
    const id = Number(req.params.id)
    const name = req.body.name
    categoryModel.update(id, name)
      .then(
        result => res.json('Category updated')
      )
      .catch(err => res.send(err)
      )
  },
  delete: (req, res) => {
    const id = Number(req.params.id)
    categoryModel.deleteCategory(id)
      .then(
        result => res.json('Category deleted')
      )
      .catch(err => res.send(err)
      )
  }
}

module.exports = categoryController