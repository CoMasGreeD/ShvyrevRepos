
class photoPost {

    constructor(photoLink = '', author = '', description = '', date = new Date('1999-06-28T07:00:00'), id = '') {
        this.author = author;
        this.photoLink = photoLink;
        this.description = description;
        this.id = id;
        this.date = date;

    }

    validatePhotoPost() {
        if (this.id && typeof (this.id) === 'string') {
            if (this.author && typeof (this.author) === 'string' && this.author.length != 0) {
                if (this.description && typeof (this.description) === 'string' && this.description.length <= 200) {
                    if (this.date && typeof (this.date) === 'object') {
                        if (this.photoLink && typeof (this.photoLink) === 'string' && this.photoLink.length != 0) {
                            return true;
                        } else { return false }
                    } else { return false }
                } else { return false }
            } else { return false }
        } else { return false }

    }
}


class photoPosts {

    constructor(postsList = []) {
        this._posts = postsList.slice();
    }

    getPhotoPosts(skip = 0, top = 10) {
        this._sortByDate();
        return this._posts.slice(skip, skip + top);
    }

    getPhotoPostByID(id) {
        for (let i = 0; i < this._posts.length; i++) {
            if (this._posts[i].id === id) {
                return this._posts[i];
            }
        }
    }

    editPhotoPost(id, new_post) {

        if (!new_post.validatePhotoPost()) {
            return false;
        }

        let post = this.getPhotoPostByID(id);

        if (post === undefined) {
            return false;
        }

        post.photoLink = new_post.photoLink;
        post.author = new_post.author;
        post.description = new_post.description;
    }
    sizePhotoPosts() {
        return this._posts.length;
    }
    addPhotoPost(post) {
        if (post.validatePhotoPost()) {
            this._posts.push(post);
            return true;
        }
        return false;
    }

    addAllPosts(postst) {
        for (let i = 0; i < postst.length; i++) {
            this._posts.push(postst[i]);
        }
    }

    _sortByDate() {

        this._posts.sort(function (post1, post2) {
            return -(post1.date - post2.date);
        });
        return true;
    }

    removePhotoPost(id) {
        if (id != undefined) {
            for (let i = 0; i < this._posts.length; i++) {
                if (this._posts[i].id === id) {
                    this._posts.splice(i, 1);
                    return true;
                }
            }
        }
        console.log("Failed :(  " + id);
        return false;
    }

    clear() {
        return this._posts.splice(0, this.length);
    }
}
const posts = new photoPosts();
const posts2 = new photoPosts();
console.log(posts.addPhotoPost(new photoPost('http://on018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание Постов,  пустое', new Date('1999-06-28T07:00:00'), '1')));
console.log(posts.addPhotoPost(new photoPost('http://onts/22/Dom.jpg', 'ля какой Влад;)', 'Описание Постов, по стандарту пустое', new Date('2000-06-28T07:00:00'), '2')));
console.log(posts.getPhotoPosts());
console.log(posts.addPhotoPost(new photoPost('http:/018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание по стандарту пустое', new Date('2018-06-28T07:00:00'), '3')));
console.log(posts.addPhotoPost(new photoPost('http://ont.m.jpg', 'Швырёв Влад;)', 'Описание Постов, по стандарту пустое', new Date('2005-06-28T07:00:00'), '4')));
console.log(posts.getPhotoPosts());
let test = []
test.push(new photoPost('http:/018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание по стандарту пустое', new Date('2018-06-28T07:00:00'), '10'));
test.push(new photoPost('http:/018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание по стандарту пустое', new Date('2018-06-28T07:00:00'), '8'));
test.push(new photoPost('http:/018/02/22/Dom.jpg', 'Швырёв Влад;)', 'Описание по стандарту пустое', new Date('2018-06-28T07:00:00'), '6'));
posts2.addAllPosts(test);
posts2.addPhotoPost(new photoPost('http://ont.by/web2/Dom.jpg', 'Швырёв Влад;)', 'Описание Постов, по стандарту пустое', new Date('2009-06-28T07:00:00'), '7'));
console.log(posts2.getPhotoPosts());
console.log(posts2.clear());
console.log(posts.removePhotoPost('2'));
console.log(posts.getPhotoPosts());
console.log(posts.getPhotoPostByID('3'));
let tmp=new photoPost('sdsd.jpg','nobody','WHY??',new Date(),'4')
posts.editPhotoPost('4', tmp);
console.log(posts.getPhotoPosts());