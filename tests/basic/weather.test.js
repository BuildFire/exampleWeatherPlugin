class WeatherTest {
  
    /**
     * Handle finishing of each test and restore data if it is the last one
     */
    static finishTest() {
      Settings.set(new WeatherData(this.initial), () => {});
    }
    initial = {};
    
    static run = () => {
      
      test("Get weather data", () => {
        WeatherData.get((err, data) => {
          this.initial = data.latestUpdate;
          console.log(data);

          if (err) {
            console.error(err);
            logError("Could not get weather data");
            WeatherTest.finishTest();
            return;
          } else {
            expect("Got weather data successfully", data);
            WeatherTest.finishTest();
          }
  
          test("Add location's weather data", () => {
            const testItem = {
                latestUpdate: new Date()
            };
            
            WeatherData.add(testItem, (e, addData) => {
              if (e) {
                logError("Could not add weather data location");
                WeatherTest.finishTest();
                return;
              } else {
                expect("Added location weather data successfully", testItem);
                WeatherTest.finishTest();
              }
                
                test("Update weather data", () => {
                    const testItem = {
                        latestUpdate: new Date()
                    };
                  WeatherData.set(testItem, (err, updateData) => {
                    if (err) {
                      console.error(err);
                      logError("Could not update WeatherData");
                      WeatherTest.finishTest();
                      return;
                    } else {
                      expect("Updated WeatherData data successfully", updateData);
                      WeatherTest.finishTest();
                    }
                  });
                });
              });
          });
        });
      });
    }
  }