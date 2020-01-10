class WeatherTest {
    initial = {};
    
    static run = () => {
      
      test("Get weather data", () => {
        WeatherData.get((err, data) => {
          this.initial = data.latestUpdate;

          if (err) {
            logError("Could not get weather data");
            return;
          } else {
            expect("Got weather data successfully", data);
          }
  
          test("Add location's weather data", () => {
            const testItem = {
                latestUpdate: new Date()
            };
            
            WeatherData.add(testItem, (e, addData) => {
              if (e) {
                logError("Could not add weather data location");
                return;
              } else {
                expect("Added location weather data successfully", testItem);
              }
                
                test("Update weather data", () => {
                    const testItem = {
                        latestUpdate: new Date()
                    };
                  WeatherData.set(testItem, (err, updateData) => {
                    if (err) {
                      console.error(err);
                      logError("Could not update WeatherData");
                      return;
                    } else {
                      expect("Updated WeatherData data successfully", updateData);
                    }
                  });
                });
              });
          });
        });
      });
    }
  }