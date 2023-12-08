import { Injectable } from '@nestjs/common';
import * as path from 'path'
import * as fs from 'fs'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
    async createFile(file: Express.Multer.File): Promise<string> | null {
        if(!file?.buffer){
            return null
        }
        const fileName = uuid.v4() + '.jpg'
        const filePath = path.resolve(__dirname, "..", "static")
        try {
            if(!fs.existsSync(filePath)){
                fs.mkdirSync(filePath, {recursive: true})
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer)
        } catch {
            return null
        }
        return fileName
    }

    async createArrayFilesAndReplaceText(files: Array<Express.Multer.File>, text: string): Promise<string>{
        let textReplace = ''
        for(let i = 0; i< files.length; i++){
            await this.createFile(files[i]).then( fileName => {
                if(!textReplace.length){
                    textReplace = text.replace(`img${i+1}:`, 'img:' + fileName)
                } else {
                    textReplace = textReplace.replace(`img${i+1}:`, 'img:' + fileName)
                }
            }).catch(() => {
                return null
            })
        }
        return textReplace
    }
}
