package main

import (
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"time"
)

func parseJsonFile(location string) func(w http.ResponseWriter, r *http.Request) {
	jsonFile, err := os.Open(location)

	if err != nil {
		log.Println(err)
	}
	defer jsonFile.Close()

	byteValue, _ := ioutil.ReadAll(jsonFile)
	
	var result map[string]interface{}
	json.Unmarshal([]byte(byteValue), &result)

	return func(w http.ResponseWriter, r *http.Request) {
			json.NewEncoder(w).Encode(result)
		}
}

func savePatientAnswer(w http.ResponseWriter, r *http.Request) {
	var message error
	jsonByteSlice, _ := ioutil.ReadAll(r.Body)
	jsonFile, err := os.OpenFile("data/answer" + time.Now().Format("20060102150405"), os.O_CREATE|os.O_APPEND|os.O_WRONLY, 0644)
	if err != nil {
		message = err
		log.Println(err)
	}
	if _, err := jsonFile.Write([]byte(jsonByteSlice)); err != nil {
		jsonFile.Close()
		log.Println(err)
		message = err
	}
	if err := jsonFile.Close(); err != nil {
		log.Println(err) 
		message = err
	}
	json.NewEncoder(w).Encode(message)
}

func main() {
	http.HandleFunc("/api/patient", parseJsonFile("data/patient-feedback-raw-data.json"))
	http.HandleFunc("/api/feedback/question", parseJsonFile("data/feedback-question.json"))
	http.HandleFunc("/api/feedback/answer", savePatientAnswer)
	
	port  := "5000"
	log.Println("Server running on port", port) 
	log.Fatal(http.ListenAndServe(":" + port, nil))
}
