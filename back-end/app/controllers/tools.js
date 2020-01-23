const express = require('express');
const { check, validationResult } = require('express-validator');

const Tools = require('../models/tools');

const router = express.Router();

router.get('/tools', async (req, res) => {
    
    try{
        let tag = req.query.tag;
        let global = req.query.global;
        if(!await Tools.exists()){
            return res.status(204).send({ msg: 'O banco de dados está vazio' })
        }

        if(tag !== undefined){
            tag = tag.toLowerCase();
            const tagTools = await Tools.find({ tags: tag });
            return res.status(200).send({ tools: tagTools })
        }
        if(global !== undefined){
            global = global.toLowerCase();
            const globalTools = await Tools.find();
            let array = []; 
            
            for(let i = 0; i < globalTools.length; i++){

                if(globalTools[i].title.toString().toLowerCase().includes(global)
                    || globalTools[i].description.toString().toLowerCase().includes(global)
                    || globalTools[i].tags.toString().toLowerCase().includes(global)
                    || globalTools[i].link.toString().toLowerCase().includes(global)){

                        array.push(globalTools[i]) 
                }
             
            }

            
            return res.status(200).send({tools: array})
        }
        const tools = await Tools.find();
        
        return res.status(200).send({ tools });

    }catch(err){
        return res.status(400).send({ 
            error: 'Erro ao tentar listar as ferramentas, verifique a conexão com o banco de dados.', err })
    }
});

router.post('/tools',
    [ 
        check('title', 'O campo titulo é obrigatório').notEmpty(), 
        check('link', 'O campo link é obrigatório').notEmpty(), 
        check('description', 'O campo descrição é obrigatória').notEmpty(), 
        check('tags', 'O campo tags é obrigatório').isArray().notEmpty() 
    ], 
    async ( req, res ) => {
    const { title, link, description, tags } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: "Verifique se está faltando algum campo a ser preenchido", errors: errors.array() });
    }
        
    try{

        let tagsLowercase = [];

        for(let i = 0; i < tags.length; i++){
            tagsLowercase.push(tags[i].toLowerCase());
        }

        let tools = await Tools.create({ title, link, description, tags: tagsLowercase });
        await tools.save();
        
        return res.status(201).send({ tools })

    }catch(err){
        return res.status(400).send({ error: 'Erro ao criar nova ferramenta' })
    }

});

router.delete('/tools/:id', async ( req, res ) => {
    try {

        let id = req.params.id;
        const tools = await Tools.findOneAndDelete({ _id: id });
        return res.status(204).send({ tools });

    } catch(err) {
        return res.status(400).send({ error: 'Erro ao tentar excluir ferramenta' });
    }
});


module.exports = app => app.use('/', router);