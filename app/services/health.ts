import { Platform } from 'react-native';
import AppleHealthKit, {
  HealthInputOptions,
  HealthKitPermissions,
} from 'react-native-health';

const PERMS = AppleHealthKit.Constants.Permissions;

const healthKitOptions: HealthKitPermissions = {
  permissions: {
    read: [
      PERMS.HeartRate,
      PERMS.ActiveEnergyBurned,
      PERMS.StepCount,
      PERMS.BodyMass,
    ],
    write: [],
  },
};

interface HealthData {
  isAuthorized: boolean;
  heartRate?: number;
  steps?: number;
  calories?: number;
}

export async function initializeHealthKit(): Promise<boolean> {
  if (Platform.OS !== 'ios') return false;

  return new Promise((resolve) => {
    AppleHealthKit.initHealthKit(healthKitOptions, (error: string) => {
      if (error) {
        console.log('[ERROR] Cannot initialize HealthKit:', error);
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

export async function getHealthData(): Promise<HealthData> {
  if (Platform.OS !== 'ios') {
    return { isAuthorized: false };
  }

  try {
    const isAuthorized = await initializeHealthKit();
    if (!isAuthorized) {
      return { isAuthorized: false };
    }

    const now = new Date();
    const options: HealthInputOptions = {
      startDate: new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString(), // 最近24小时
      endDate: now.toISOString(),
    };

    const [heartRate, steps, calories] = await Promise.all([
      new Promise<number>((resolve) => {
        AppleHealthKit.getHeartRateSamples(options, (error, results) => {
          if (error) {
            console.log('Error getting heart rate:', error);
            resolve(0);
          } else {
            const latestHeartRate = results[results.length - 1]?.value || 0;
            resolve(latestHeartRate);
          }
        });
      }),
      new Promise<number>((resolve) => {
        AppleHealthKit.getStepCount(options, (error, results) => {
          if (error) {
            console.log('Error getting steps:', error);
            resolve(0);
          } else {
            resolve(results.value || 0);
          }
        });
      }),
      new Promise<number>((resolve) => {
        AppleHealthKit.getActiveEnergyBurned(options, (error, results) => {
          if (error) {
            console.log('Error getting calories:', error);
            resolve(0);
          } else {
            resolve(results[results.length - 1]?.value || 0);
          }
        });
      }),
    ]);

    return {
      isAuthorized: true,
      heartRate,
      steps,
      calories,
    };
  } catch (error) {
    console.log('Error getting health data:', error);
    return { isAuthorized: false };
  }
} 