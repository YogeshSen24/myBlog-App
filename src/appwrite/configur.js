import conf from '../conf/conf.js'
import {Client, ID, Storage , Databases, Query} from "appwrite"

export class Service{
    client  = new Client()
    databases
    bucket

    constructor(){
        this.client.setEndpoint(conf.appwriteUrl)  // Your API Endpoint
        .setProject(conf.appwriteProjectId)  ;     // Your project ID
        this.databases   = new Databases(this.client);
        this.bucket = new Storage(this.client)
    }
    
    async createPost({title , slug , content , image , status , userId}){
        try {
            // console.log(title , slug , content , featuredImage , status , userId);
            return await this.databases.createDocument(
                conf.appwriteDatabaseId , conf.appwriteCollectionId , slug ,
                { 
                    title,
                    content,
                    status,
                    image,
                    userId,
                }
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost( slug , {title ,content , image , status }){
        try {
            console.log(slug);
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId ,
                slug , 
                {
                    title,
                    content , 
                    image ,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }
    async deletePost(slug){
        try {
             await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId ,
                slug 
            )
            return true
        } catch (error) {
            throw error
        }
    }
    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId ,
                slug 
            )
        } catch (error) {
            console.log("COUDENT FETCH THE POST!!!  , ERROR " , error )
        }
    }
    async getPosts(queries= [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId ,
                queries
            )
        } catch (error) {
            throw error
        }
    }

    //file uplode services

    async uplodeFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            throw error
        }
    }
     getFilePreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId)
                // console.log(fileId);
                // return true
        } catch (error) {
            throw error
        }
    }

}

const service = new Service()

export default service