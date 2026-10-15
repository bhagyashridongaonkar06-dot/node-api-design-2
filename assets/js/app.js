const cl = console.log;

let posts = [
  {
    id: "1",
    title:
      "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    content:
      "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architect",
  },
  {
    id: "2",
    title: "qui est esse",
    content:
      "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
  },
  {
    id: "3",
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    content:
      "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
  },
];

const PORT = 3000;

const { json } = require("body-parser");
const express = require("express");

const app = express();

app.use(express.json());

app.get("/api/posts", (req, res) => {
  try {
    res.status(200).json({
      ok: true,
      data: posts,
      msg: "data fetched successfully",
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message,
      msg: "something went wrong while fetching the data",
    });
  }
});

//for single post get
app.get("/api/posts/:id", (req, res) => {
  try {
    let singleobjId = req.params.id;
    cl(singleobjId);

    let post = posts.find((e) => e.id === singleobjId);
    if (!post) {
      return res.status(404).json({
        ok: false,
        msg: "data not found",
      });
    }
    res.status(200).json({
      ok: true,
      msg: "single object data fetched successfully",
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      msg: "error while fetching single object data",
      error: err.message,
    });
  }
});

app.post("/api/posts", (req,res)=>{
  try{
    let body = req.body
    if(!body.title || !body.content){
      res.status(400).json({
        ok: false,
      msg : 'title and content are not found',
      })
    }
     let newobj = {
        title : body.title,
        content : body.content,
        id : Date.now().toString()
     }
     posts.push(newobj)
     res.status(201).json({
      ok : true,
      msg : 'new post created successfully',
      data : newobj
     })

  }catch(err){
    res.status(500).json({
      ok : false,
      msg : 'unable to create new blog',
      error : err.message
    })
  }
})

app.delete("/api/posts/:id", (req, res)=>{
  try{
    let removeId = req.params.id;

    let idx = posts.findIndex(e => e.id === removeId)

    if(idx === -1){
      return res.status(404).json({
        ok : false,
        msg : 'data not found',
      })
    }
    let dltpost = posts.splice(idx, 1)
    res.status(200).json({
      ok : true,
      msg : 'post deleted successfully',
      data : dltpost[0]
    })

  }catch(err){
      res.status(500).json({
        ok : false,
        msg : 'unable to remove post',
        error : err.message
      })
  }
})

app.patch('/api/posts/:id', (req, res)=>{
  try{
    let updateId = req.params.id
    let body = req.body
    let upd_idx = posts.findIndex(e => e.id === updateId)

    if(upd_idx === -1){
      return res.status(404).json({
        ok : false,
        msg : 'data not found',
      })
    }
    if(!body.title || !body.content){
      return res.status(400).json({
        ok :false,
        msg : 'title and content are required',
      })
    }

    let updateObj = {
      ...posts[upd_idx],
      title : body.title,
      content : body.content
    }
    res.status(200).json({
      ok : true,
      msg : 'post updated successfully',
      data : updateObj
    })

  }catch(err){
    res.status(500).json({
      ok : false,
      msg : 'unable to update thr post',
      error : err.message
    })
  }
})

app.listen(PORT, () => {
  cl(`server is running on port ${PORT} `);
});
