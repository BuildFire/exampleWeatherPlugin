class SettingsTest {
    initial = {};
    
    static run = () => {
      
      test("Get settings data", () => {
        Settings.get((err, data) => {
          this.initial = data.place;

          if (err) {
            logError("Could not get settings data");
            return;
          } else {
            expect("Got settings data successfully", data);
          }
  
          test("Add location", () => {
            const testItem = {
              title: "Test 1",
              address: {
                lat: 32,
                lng: 34
              }
            };
            
            Settings.add(testItem, (e, addData) => {
              if (e) {
                logError("Could not add location");
                return;
              } else {
                expect("Added location successfully", testItem);
              }
                
                test("Update settings", () => {
                  const testItem = {
                    title: "Test 1",
                    address: {
                      lat: 32,
                      lng: 34
                    }
                  };
                  Settings.set(testItem, (err, updateData) => {
                    if (err) {
                      logError("Could not update settings");
                      return;
                    } else {
                      expect("Updated settings data successfully", updateData);
                    }
                  });
                });
              });
          });
        });
      });
    }
  }