# Egyptian National ID Validator

A JavaScript utility for validating and extracting information from Egyptian National ID numbers.

## Overview

The Egyptian National ID (بطاقة الرقم القومى) is a 14-digit number that contains encoded information about the holder, including:

- Birth date
- Place of birth (governorate)
- Gender
- Birth order sequence

## National ID Structure

The 14-digit number is structured as follows:

| Digits | Meaning                                      |
| ------ | -------------------------------------------- |
| 1      | Century of birth (2 = 1900s, 3 = 2000s)      |
| 2-3    | Year of birth within the century             |
| 4-5    | Month of birth                               |
| 6-7    | Day of birth                                 |
| 8-9    | Governorate code                             |
| 10-13  | Birth order in the governorate on that day   |
| 13     | Gender indicator (odd = male, even = female) |

## Features

1. **Birth Date Validation and Extraction**

   - Century detection (1900s or 2000s)
   - Full birth date extraction (year, month, day)

2. **Governorate Verification**

   - Supports all Egyptian governorates
   - Maps governorate codes to names
   - Handles unknown governorate codes

3. **Birth Order and Gender**
   - Extracts birth sequence number
   - Determines gender based on the last digit
   - Validates number format

## Usage

```javascript
const nationalID = "31511151601339";
nationalIDinfogetter(nationalID);
```

### Output Format

The script outputs information in three sections:

```
=== Birth Date Information ===
Person born in 2000s
Year of birth: 2015
Month of birth: 11
Day of birth: 15

=== Governorate Information ===
Governorate: Gharbia (code: 16)

=== Birth Order and Gender Information ===
Birth Order Number: 0133
Gender: Male
```

## Supported Governorate Codes

| Code | Governorate    |
| ---- | -------------- |
| 01   | Cairo          |
| 02   | Alexandria     |
| 03   | Port Said      |
| 04   | Suez           |
| 11   | Damietta       |
| 12   | Dakahlia       |
| 13   | Sharqia        |
| 14   | Qalyubia       |
| 15   | Kafr El Sheikh |
| 16   | Gharbia        |
| 17   | Monufia        |
| 18   | Beheira        |
| 19   | Ismailia       |
| 21   | Giza           |
| 22   | Beni Suef      |
| 23   | Fayoum         |
| 24   | Minya          |
| 25   | Assiut         |
| 26   | Sohag          |
| 27   | Qena           |
| 28   | Aswan          |
| 29   | Luxor          |
| 31   | Red Sea        |
| 32   | New Valley     |
| 33   | Matrouh        |
| 34   | North Sinai    |
| 35   | South Sinai    |
| 88   | Outside Egypt  |

## Validation Rules

1. **Length Check**: Must be exactly 14 digits
2. **Character Check**: Must contain only numbers
3. **Century Validation**: First digit must be 2 or 3
4. **Governorate Code**: Must be a valid governorate code
5. **Gender Determination**: Last digit of sequence determines gender
   - Even number (0,2,4,6,8) = Female
   - Odd number (1,3,5,7,9) = Male

## Performance Optimizations

- Uses `Map` data structure for efficient governorate lookups
- Implements early validation to prevent unnecessary processing
- Separates concerns into focused functions for better maintainability
- Caches values to prevent repeated calculations
- Utilizes efficient string operations

## Error Handling

The script handles various error cases:

- Invalid ID length
- Non-numeric characters
- Invalid century digits
- Unknown governorate codes

## Technical Details

- Written in JavaScript
- No external dependencies
- Optimized for performance with large datasets
- Modular design for easy maintenance and updates
