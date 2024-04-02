import config from "../config/config";
import { Client, Databases, Storage, Query, ID } from "appwrite";

export class Service {
    client =  new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(config.appwrite_url)
            .setProject(config.appwrite_projectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client); 
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Appwrite service ::createPost :: error",error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite service ::updatePost :: error",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("Appwrite service ::deletePost :: error",error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service ::getPost :: error",error);
            return false
        }
    }
// Query.equal("status", "active")
    async getPosts(queries = []){
        try {
            return await this.databases.listDocuments(
                config.appwrite_databaseId,
                config.appwrite_collectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite service ::getPosts :: error",error);
            return false
        }
    }

    // File Upload

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                config.appwrite_bucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service ::uploadFile :: error",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                config.appwrite_bucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service ::deleteFile :: error",error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            config.appwrite_bucketId,
            fileId
        )
    }
}

const service = new Service()

export default service;