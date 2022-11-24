package com.eva.backend.tools;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import org.springframework.web.multipart.MultipartFile;

public class FileUpload {
	
	public static void saveFile(String uploadDir, String filename, MultipartFile multipartFile) throws IOException{
		Path uploadPath = Paths.get(uploadDir);
		
		if(!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}
		try(InputStream inputStream = multipartFile.getInputStream()){
			Path  filePath = uploadPath.resolve(filename);
			Files.copy(inputStream,  filePath,StandardCopyOption.REPLACE_EXISTING);
			
		}catch(IOException ioe){
			throw new IOException("Could not save image file:"+filename,ioe);
		}
	}

}
