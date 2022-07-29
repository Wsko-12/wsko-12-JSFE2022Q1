import { EConstants } from '../../typescript/enums';

export default class Utils {
    public static msToSec(ms: number) {
        return Math.round((ms / EConstants.MS_IN_SEC) * 100) / 100;
    }
}
