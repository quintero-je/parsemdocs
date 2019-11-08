const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const fileMan = require('../helpers/fileMan');
const parser = require('../helpers/parser');
const cleanUrl = require('../helpers/cleanUrl');
const User = require('../models/user');
const Docs = require('../models/docs');
const Csv = require('../models/csvHistory');
const DocsHistory = require('../models/docsHistory');
const prettyHtml = require('json-pretty-html').default;
const jsonToCSV = require('json-to-csv');

router.get('/', (req, res) => {
  res.render('docsUpload');
});

router.get('/docs/upload', (req, res) => {
  res.render('docsUpload');
});

router.post('/docs/save', async (req, res) => {
  let files = [];
  await req.files.forEach(element => {
    files.push({
      thumbnailUrl: '/uploads/' + cleanUrl(element.originalname),
      name: cleanUrl(element.originalname),
      deleteType: "DELETE",
      type: element.mimetype,
      size: element.size,
      url: '/uploads/' + cleanUrl(element.originalname),
      deleteUrl: '/uploads/+element.originalname'
    });
  });
  res.send({ files: files }).status(200);
});

router.get('/docs/insert', (req, res) => {
  res.render('docForm');
});

router.post('/docs/insertsave', async (req, res) => {
  let doc = new Docs(req.body);
  await doc.save();
  res.redirect('/docs/history')
});

router.get('/docs/list', async (req, res) => {
  let files = new fileMan(path.join(__dirname, '../public/uploads/'));
  let docs = files.getFileList();
  res.render('docsList', { docs });
});

router.get('/docs/process', (req, res) => {
  let files = new fileMan(path.join(__dirname, '../public/uploads/'));
  let docs = files.getFileList();
  let array = [];
  docs.forEach((item) => {
    let file = new fileMan(path.join(__dirname, '../public/uploads/' + item));
    array.push(docProcess(item));
    file.delFile();
  });
  res.redirect('/docs/history');
});

router.post('/docs/individual/:name', (req, res) => {
  docProcess(req.params.name);
  let file = new fileMan(path.join(__dirname, '../public/uploads/' + req.params.name));
  file.delFile();
  res.redirect('/docs/list');
});

router.post('/docs/edit/:id', async (req, res) => {
  let doc = await Docs.findOne({ _id: req.params.id });
  res.render('docEdit', { doc });
});

router.post('/docs/update/:id', async (req, res) => {
  await Docs.update({ _id: req.params.id }, req.body);
  res.redirect('/docs/history');
})

router.post('/docs/remove/:name', (req, res) => {
  let doc = new fileMan(path.join(__dirname, '../public/uploads/' + req.params.name));
  doc.delFile();
  res.redirect('/docs/list');
});

router.get('/docs/history', async (req, res) => {
  let docs = await Docs.find({}, { filename: 1, _id: 1, csvname: 1, createdAt: 1 });
  res.render('docsHistory', { docs });
})

router.get('/csv/list', async (req, res) => {
  let csvs = await Csv.find().sort({ createdAt: -1 });
  let count = await Docs.count({ csvname: '' });
  res.render('csvList', { csvs, count });
});

router.get('/csv/generate', async (req, res) => {
  let docs = await Docs.find({ 'csvname': '' });
  let csvname = Date.now() + '.csv';
  let csv = path.join(__dirname, '../public/downloads/' + csvname);
  let files = '';
  if (docs && docs.length) {
    jsonToCSV(docs, csv)
      .then(() => {
        res.redirect('/csv/list');
      })
      .catch(error => {
        console.log(error);
      });
    docs.forEach(async (el) => {
      files += el.filename + ' | ';
      await Docs.update({ '_id': el._id }, { $set: { 'csvname': csvname } });
    })
    let c = { 'name': csvname, 'files': files };
    let n = new Csv(c);
    await n.save();

  } else {
    res.redirect('/csv/list');
  }
});

router.post('/csv/download/:id', async (req, res) => {
  await Csv.update({ _id: req.params.id }, { $set: { downloaded: true } });
  res.redirect('/csv/list');
});

async function docProcess(file) {
  let text = parser(file);
  let doc = new Docs(text);
  doc.post_content = '';
  doc.post_excerpt = '';
  doc.featured_image = '';
  doc._company_id = '';
  doc.ndc = '';
  doc._imprint_id = '';
  doc.ememi_drug_category = '';
  doc.ememi_generic_category = '';
  doc.ememi_index = '';
  doc.ememi_solution = '';
  doc.drug_color = '';
  doc.drug_shape = '';
  doc.filename = file;
  doc.csvname = '';
  let docu = await doc.save();
  return docu;
}

module.exports = router;