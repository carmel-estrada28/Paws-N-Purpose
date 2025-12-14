package com.kinora.paws_n_purpose_backend.service;

import org.springframework.stereotype.Service;

import com.kinora.paws_n_purpose_backend.entity.User;
import com.kinora.paws_n_purpose_backend.entity.Wallet;
import com.kinora.paws_n_purpose_backend.repository.WalletRepository;

@Service
public class WalletService {
    private final WalletRepository walletRepository;

    public WalletService(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

    public Wallet createWallet(User owner) {
        
        Wallet wallet = new Wallet();
        wallet.setOwner(owner);
        owner.setWallet(wallet);

        return walletRepository.save(wallet);
    }
}
