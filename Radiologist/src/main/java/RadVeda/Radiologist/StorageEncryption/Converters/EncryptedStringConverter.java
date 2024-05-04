package RadVeda.Radiologist.StorageEncryption.Converters;

import RadVeda.Radiologist.StorageEncryption.EncryptionUtility;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class EncryptedStringConverter implements AttributeConverter<String, String> {

    @Override
    public String convertToDatabaseColumn(String attribute) {
        return attribute == null ? null : EncryptionUtility.encrypt(attribute);
    }

    @Override
    public String convertToEntityAttribute(String dbData) {
        return dbData == null ? null : EncryptionUtility.decrypt(dbData);
    }
}
