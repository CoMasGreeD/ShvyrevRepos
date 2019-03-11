(function(){
let photoPosts = [
    {
        id: '1',
        descriprion: 'Описание Постов, по стандарту пустое',

        createdAt: new Date('1999-06-28T07:00:00'),

        author: 'Швырёв Влад;)',

        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
    },
    {
        id: '2',
        descriprion: 'Описание Постов, по стандарту пустое',

        createdAt: new Date('1999-06-28T07:07:00'),

        author: 'Швырёв Влад;)',

        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg',
    },
    {
        id: '3',
        descriprion: 'Описание Постов, по стандарту пустое',

        createdAt: new Date('2010-09-28T07:00:00'),

        author: 'Швырёв Влад;)',

        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
    },
    {
        id: '4',
        descriprion: 'Описание Постов, по стандарту пустое',

        createdAt: new Date('2005-06-28T07:05:00'),

        author: 'Швырёв Влад;)',

        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
    },
    {
        id: '5',
        descriprion: 'Описание Постов, по стандарту пустое',

        createdAt: new Date('2000-07-28T07:00:00'),

        author: 'Швырёв Влад;)',

        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
    },
    {
        id: '6',
        descriprion: 'Описание Постов, по стандарту пустое',

        createdAt: new Date('2000-06-28T07:00:00'),

        author: 'Швырёв Влад;)',

        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
    },
    {
        id: '7',
        descriprion: 'Описание Постов, по стандарту пустое',

        createdAt: new Date('1999-06-28T07:00:00'),

        author: 'Швырёв Влад;)',

        photoLink: 'http://ont.by/webroot/delivery/files/news/2018/02/22/Dom.jpg'
    },
];
photoPosts.sort(function (photoPosts1, photoPosts2) {
    return -(photoPosts1.createdAt - photoPosts2.createdAt);
});
function findPostIndex(id) {
    for (let i = 0; i < photoPosts.length; i++) {
        if (photoPosts[i].id == id) {
            return i;
        }
    }
    return false;
}
function validateID(post) {
    let validate = true;
    if (post.id == undefined) {
        validate = false;
    }
    else if (typeof (post.id) != 'string') {
        validate = false;
    }
    return validate;
}

function validateDescription(post) {
    let validate = true;
    if (post.descriprion == undefined) {
        validate = false;
    }
    else {
        if (typeof (post.descriprion) != 'string') {
            validate = false;
        }
        else if (post.descriprion.length >= 200) {
            validate = false;
        }
    }
    return validate;
}

function validateCreatedAt(post) {
    let validate = true;
    if (post.createdAt == undefined) {
        validate = false;
    }
    else if (typeof (post.createdAt) != 'object') {
        validate = false;
    }
    return validate;
}

function validateAuthor(post) {
    let validate = true;
    if (post.author == undefined) {
        validate = false;
    }
    else {
        if (typeof (post.author) != 'string') {
            validate = false;
        }
        else if (post.author.length == 0) {
            validate = false;
        }
    }
    return validate;
}

function validatePhotoLink(post) {
    let validate = true;
    if (post.photoLink == undefined) {
        validate = false;
    }
    else {
        if (typeof (post.photoLink) != 'string') {
            validate = false;
        }
        else if (post.photoLink.length == 0) {
            validate = false;
        }
    }
    return validate;
}
function validatePhotoPost(post) {
    if (post != undefined) {
        return validateID(post)
            & validateDescription(post)
            & validateCreatedAt(post)
            & validateAuthor(post)
            & validatePhotoLink(post)
    }
}
function addPhotoPost(post) {
    if (validatePhotoPost(post)) {
        photoPosts.push(post);
        return true;
    }
    return false;
}
function getPhotoPostByID(id) {
    console.log("данный пост по введённому id : " + id);
    console.log(photoPosts[findPostIndex(id)]);
    return photoPosts[findPostIndex(id)];
}
function removePhotoPost(id) {
    if (id != undefined) {
        let RemoveIndex = findPostIndex(id);
        if (RemoveIndex != -1) {
            photoPosts.splice(RemoveIndex, 1);
            return true;
        }
    }
    console.log("Failed :( ) " + id);
    return false;
}

function show(p, skip, top) {
    let skipDefault = 0;
    let topDefault = 10;
    let result = [];
    if (skip != 0) {
        skipDefault = skip;
    }
    if (top > 10) {
        topDefault = top;
    }
    for (let i = skipDefault; i < topDefault; i++) {
        if (p[i] != undefined) {
            result.push(p[i]);
        }else{i++}
    }
    return result;
}
function editPhotoPost(id, params) {
    let ChangeIndex = findPostIndex(id)
    let postToChange = photoPosts[ChangeIndex];
    if (validatePhotoPost(postToChange)) {
        for (var param in params) {
                postToChange[param] = params[param];  
            }
            return true;
        }
        return false;
    }

    removePhotoPost("5");
    editPhotoPost("1", {
        descriprion: "New description",
        author: 'Nobody',
    });
    show(photoPosts,0,10);
});
